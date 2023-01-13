# ConcurrentHashMap

## 1.一些重要的常量

``` java
if (key == null || value == null) throw new NullPointerException();
    //重新计算一次hash，并且保证为正值
    int hash = spread(key.hashCode());
    int binCount = 0;
```

``` java
//最大容量
private static final int MAXIMUM_CAPACITY = 1 << 30;
//默认的初始化容量
private static final int DEFAULT_CAPACITY = 16;
//负载因子，表示元素的密集程度
private static final float LOAD_FACTOR = 0.75f;
//链表转化为红黑树时链表元素个数
static final int TREEIFY_THRESHOLD = 8;
//红黑树转化为链表时元素个数
static final int UNTREEIFY_THRESHOLD = 6;
/**
 *   当table数组的长度小于此值时，不会把链表转化为红黑树。
 *   所以转化为红黑树有两个条件，还有一个是 TREEIFY_THRESHOLD
 *   最小树形化容量阈值：即 当哈希表中的容量 > 该值时，才允许树形化链表 （即 将链表 转换成红黑树）
 *   否则，若桶内元素太多时，则直接扩容，而不是树形化
 *   树的最小的容量，至少是 4 x TREEIFY_THRESHOLD = 32 然后为了避免(resizing 和 treeification thresholds) 设置成64
 */ 
static final int MIN_TREEIFY_CAPACITY = 64;
/**
 *   扩容操作中，transfer这个步骤是允许多线程的，这个常量表示一个线程执行transfer时，最少要对连续的16个hash桶进行transfer  （不足16就按16算，多控制下正负号就行）
 *   也就是单线程执行transfer时的最小任务量，单位为一个hash桶，这就是线程的transfer的步进（stride）
 *   最小值是DEFAULT_CAPACITY，不使用太小的值，避免太小的值引起transfer时线程竞争过多，如果计算出来的值小于此值，就使用此值
 *   正常步骤中会根据CPU核心数目来算出实际的，一个核心允许8个线程并发执行扩容操作的transfer步骤，这个8是个经验值，不能调整的
 *   因为transfer操作不是IO操作，也不是死循环那种100%的CPU计算，CPU计算率中等，1核心允许8个线程并发完成扩容，理想情况下也算是比较合理的值
 *   一段代码的IO操作越多，1核心对应的线程就要相应设置多点，CPU计算越多，1核心对应的线程就要相应设置少一些
 *   表明：默认的容量是16，也就是默认构造的实例，第一次扩容实际上是单线程执行的，看上去是可以多线程并发（方法允许多个线程进入），
 *      但是实际上其余的线程都会被一些if判断拦截掉，不会真正去执行扩容
 */
private static final int MIN_TRANSFER_STRIDE = 16;
/**
 *   下面几个是特殊的节点的hash值，正常节点的hash值在hash函数中都处理过了，不会出现负数的情况，特殊节点在各自的实现类中有特殊的遍历方法
 *   ForwardingNode的hash值，ForwardingNode是一种临时节点，在扩进行中才会出现，并且它不存储实际的数据
 *   如果旧数组的一个hash桶中全部的节点都迁移到新数组中，旧数组就在这个hash桶中放置一个ForwardingNode
 *   读操作或者迭代读时碰到ForwardingNode时，将操作转发到扩容后的新的table数组上去执行，写操作碰见它时，则尝试 帮助扩容
 */
static final int MOVED     = -1; // hash for forwarding nodes
/**
 *   TreeBin的hash值，TreeBin是ConcurrentHashMap中用于代理操作TreeNode的特殊节点，持有存储实际数据的红黑树的根节点
 *   因为红黑树进行写入操作，整个树的结构可能会有很大的变化，这个对读线程有很大的影响，
 *   所以TreeBin还要维护一个简单读写锁，这是相对HashMap，这个类新引入这种特殊节点的重要原因
 */
static final int TREEBIN   = -2; // hash for roots of trees
/** 
 *   ReservationNode的hash值，ReservationNode是一个保留节点，就是个占位符，不会保存实际的数据，正常情况是不会出现的，
 *   在jdk1.8新的函数式有关的两个方法computeIfAbsent和compute中才会出现
 */
static final int RESERVED  = -3; // hash for transient reservations
//用于和负数hash值进行 & 运算，将其转化为正数（绝对值不相等），Hashtable中定位hash桶也有使用这种方式来进行负数转正数
static final int HASH_BITS = 0x7fffffff; // usable bits of normal node

/**
 *   非常重要的一个属性，源码中的英文翻译，直译过来是下面的四行文字的意思
 *       sizeCtl = -1，表示有线程正在进行真正的初始化操作
 *       sizeCtl = -(1 + nThreads)，表示有nThreads个线程正在进行扩容操作
 *       sizeCtl > 0，表示接下来的真正的初始化操作中使用的容量，或者初始化/扩容完成后的threshold
 *       sizeCtl = 0，默认值，此时在真正的初始化操作中使用默认容量
 *   但是，通过我对源码的理解，这段注释实际上是有问题的，
 *       有问题的是第二句，sizeCtl = -(1 + nThreads)这个，网上好多都是用第二句的直接翻译去解释代码，这样理解是错误的
 *   默认构造的16个大小的ConcurrentHashMap，只有一个线程执行扩容时，sizeCtl = -2145714174，
 *       但是照这段英文注释的意思，sizeCtl的值应该是 -(1 + 1) = -2
 *   sizeCtl在小于0时的确有记录有多少个线程正在执行扩容任务的功能，但是不是这段英文注释说的那样直接用 -(1 + nThreads)
 *   实际中使用了一种生成戳，根据生成戳算出一个基数，不同轮次的扩容操作的生成戳都是唯一的，来保证多次扩容之间不会交叉重叠，
 *       当有n个线程正在执行扩容时，sizeCtl在值变为 (基数 + n)
 */
private transient volatile int sizeCtl;
/**
 *   下一个transfer任务的起始下标index 加上1 之后的值，transfer时下标index从length - 1开始往0走
 *   transfer时方向是倒过来的，迭代时是下标从小往大，二者方向相反，尽量减少扩容时transefer和迭代两者同时处理一个hash桶的情况，
 *   顺序相反时，二者相遇过后，迭代没处理的都是已经transfer的hash桶，transfer没处理的，都是已经迭代的hash桶，冲突会变少
 *   下标在[nextIndex - 实际的stride （下界要 >= 0）, nextIndex - 1]内的hash桶，就是每个transfer的任务区间
 *   每次接受一个transfer任务，都要CAS执行 transferIndex = transferIndex - 实际的stride，
 *   保证一个transfer任务不会被几个线程同时获取（相当于任务队列的size减1）
 *   当没有线程正在执行transfer任务时，一定有transferIndex <= 0，这是判断是否需要帮助扩容的重要条件（相当于任务队列为空）
 */
private transient volatile int transferIndex;
```

## 2.putVal

```java
//K V就是put的K V 
//onlyIfAbsent
final V putVal(K key, V value, boolean onlyIfAbsent) {
    //K V都不能为空，K需要计算hash命中
    //至于V不允许为空，是为了避免歧义，下面举个例子
    //假设V可以为空，当get(K)时为null，无法判断时没有K还是K对应的值为null，于是contains(K)来判断
    //这额正是hashmap采取的方法（hashmap允许null值），但是在并发情况下，get(K) = null时在使用contains(K)得到了true
    //无法保证这两次操作之间没有别的线程进行了操作，于是就会出现问题
    if (key == null || value == null) throw new NullPointerException();
    //重新计算一次hash，并且保证为正值
    int hash = spread(key.hashCode());
    int binCount = 0;
    //table：map的底层数组
    for (Node<K,V>[] tab = table;;) {
        Node<K,V> f; int n, i, fh;
        //在new ConcurrentHashMap实际上没有初始化 
        //还没有初始化就进行初始化
        if (tab == null || (n = tab.length) == 0)
            tab = initTable();//cas操作 SIZECTL=-1
        //该位置是空的，cas插入
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            if (casTabAt(tab, i, null,
                         new Node<K,V>(hash, key, value, null)))
                break;                   // no lock when adding to empty bin
        }
        //MOVED= -1，表示这个节点已经完成迁移，此时线程帮助扩容，helpTransfer方法后面再说
        else if ((fh = f.hash) == MOVED)
            tab = helpTransfer(tab, f);
        //要put的节点不为空
        else {
            V oldVal = null;
            //加锁，concurrenthashmap的锁粒度可以在这里看出来，数组上每个节点都是一个锁
            synchronized (f) {
                //这个期间没有发生意外（扩容完成等
                if (tabAt(tab, i) == f) {
                    //hash不为负表示这是个正常的节点
                    //-1 表示 已经迁移完成 -2 表示这是个红黑树 其余表示正在扩容
                    if (fh >= 0) {
                        binCount = 1;
                        for (Node<K,V> e = f;; ++binCount) {
                            K ek;
                            //找到了要put的节点，完成out，退出循环
                            if (e.hash == hash &&
                                ((ek = e.key) == key ||
                                 (ek != null && key.equals(ek)))) {
                                oldVal = e.val;
                                if (!onlyIfAbsent)
                                    e.val = value;
                                break;
                            }
                            Node<K,V> pred = e;
                            //如果没有找到相应的K，说明链表中没有这个key
                            //使用尾插法（jdk1.7是头插法有回路问题）
                            if ((e = e.next) == null) {
                                pred.next = new Node<K,V>(hash, key,
                                                          value, null);
                                break;
                            }
                        }
                    }
                    //如果hash = -2 ，表示这是个红黑树
                    //红黑树真正存放数据的是TreeNode，而整棵树都是TreeBin的子树
                    //也就是说通过TreeBin（唯一）挂载到concurrenthashmap的底层数组中，TreeBin的子节点是红黑树的root节点
                    //为什么要这么做？==》TreeBin是一个锁
                    else if (f instanceof TreeBin) {
                        Node<K,V> p;
                        binCount = 2;
                        //put
                        if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                       value)) != null) {
                            oldVal = p.val;
                            if (!onlyIfAbsent)
                                p.val = value;
                        }
                    }
                }
            }
            if (binCount != 0) {
                //超过了8，把链表转化为树
                if (binCount >= TREEIFY_THRESHOLD)
                    treeifyBin(tab, i);
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
    addCount(1L, binCount);
    return null;
}
```

## 3.initTable

```java
private final Node<K,V>[] initTable() {
    Node<K,V>[] tab; int sc;
    //1，如果当前table数组是空的
    while ((tab = table) == null || tab.length == 0) {
     //2，sizeCtl是否有线程占用，如果是，则让出CPU，进入就绪状态，默认值为0，-1指的是正在初始化
        if ((sc = sizeCtl) < 0)
            Thread.yield(); // lost initialization race; just spin
        //3，修改sc的值为-1，原子层面修改，compareAndSwapInt本地方法，具体如何实现，可以下载相关源码查看
        else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) {
            try {
                if ((tab = table) == null || tab.length == 0) {
                 //如果 sizeCtl>0 初始化大小为sizeCtl，否则初始化大小为16
                    int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                    @SuppressWarnings("unchecked")
                    Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                    table = tab = nt;
                    //sc赋值，如果n为16,则sc = 16-16/4 = 12，
                    sc = n - (n >>> 2);//0.75
                }
            } finally {
             //赋值给sizeCtl，初始化结束，sizeCtl的值>0
                sizeCtl = sc;
            }
            break;
        }
    }
    return tab;
}
```

## 4.helpTransfer

```java
   final Node<K,V>[] helpTransfer(Node<K,V>[] tab, Node<K,V> f) {
       //nextTab 引用的是 fwd.nextTable == map.nextTable 理论上是这样。
       //sc 保存map.sizeCtl
       Node<K,V>[] nextTab; int sc;

       //条件一：tab != null 恒成立 true
       //条件二：(f instanceof ForwardingNode) 恒成立 true
       //条件三：((ForwardingNode<K,V>)f).nextTable) != null 恒成立 true
       if (tab != null && (f instanceof ForwardingNode) &&
           (nextTab = ((ForwardingNode<K,V>)f).nextTable) != null) {

           //拿当前标的长度 获取 扩容标识戳   假设 16 -> 32 扩容：1000 0000 0001 1011
           int rs = resizeStamp(tab.length);

           //条件一：nextTab == nextTable
           //成立：表示当前扩容正在进行中
           //不成立：1.nextTable被设置为Null 了，扩容完毕后，会被设为Null
           //       2.再次出发扩容了...咱们拿到的nextTab 也已经过期了...
           //条件二：table == tab
           //成立：说明 扩容正在进行中，还未完成
           //不成立：说明扩容已经结束了，扩容结束之后，最后退出的线程 会设置 nextTable 为 table

           //条件三：(sc = sizeCtl) < 0
           //成立：说明扩容正在进行中
           //不成立：说明sizeCtl当前是一个大于0的数，此时代表下次扩容的阈值，当前扩容已经结束。
           while (nextTab == nextTable && table == tab &&
                  (sc = sizeCtl) < 0) {
               //条件一：(sc >>> RESIZE_STAMP_SHIFT) != rs
               //      true->说明当前线程获取到的扩容唯一标识戳 非 本批次扩容
               //      false->说明当前线程获取到的扩容唯一标识戳 是 本批次扩容
               //条件二： JDK1.8 中有bug jira已经提出来了 其实想表达的是 =  sc == (rs << 16 ) + 1
               //        true-> 表示扩容完毕，当前线程不需要再参与进来了
               //        false->扩容还在进行中，当前线程可以参与
               //条件三：JDK1.8 中有bug jira已经提出来了 其实想表达的是 = sc == (rs<<16) + MAX_RESIZERS 
              //条件四：transferIndex <= 0
               //      true->说明map对象全局范围内的任务已经分配完了，当前线程进去也没活干..
               //      false->还有任务可以分配。
               if ((sc >>> RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 ||
                   sc == rs + MAX_RESIZERS || transferIndex <= 0)
                   break;
               if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1)) {
                   transfer(tab, nextTab);
                   break;
               }
           }
           return nextTab;
       }
       return table;
   }

```

## 4.transfer(难点)，只知道个大概还是没搞明白

```java
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
        int n = tab.length, stride;
 
        //将 (n>>>3相当于 n/8) 然后除以 CPU核心数。如果得到的结果小于 16，那么就使用 16
 
        // 这里的目的是让每个 CPU 处理的桶一样多，避免出现转移任务不均匀的现象，如果桶较少的话，默认一个 CPU（一个线程）处理 16 个桶，也就是长度为16的时候，扩容的时候只会有一个线程来扩容
        if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
            stride = MIN_TRANSFER_STRIDE; // subdivide range
        
        //nextTab未初始化，nextTab是用来扩容的node数组
        if (nextTab == null) {            // initiating
            try {
 
                //新建一个n<<1原始table大小的nextTab,也就是32
                @SuppressWarnings("unchecked")
                Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n << 1];
 
                //赋值给nextTab
                nextTab = nt;
            } catch (Throwable ex) {      // try to cope with OOME
 
                //扩容失败，sizeCtl使用int的最大值
                sizeCtl = Integer.MAX_VALUE;
                return;
            }
 
            //更新成员变量
            nextTable = nextTab;
 
            //更新转移下标，表示转移时的下标
            transferIndex = n;
        }
 
        //新的tab的长度
        int nextn = nextTab.length;
 
        // 创建一个 fwd 节点，表示一个正在被迁移的Node，并且它的hash值为-1(MOVED)，也就是前面我们在讲putval方法的时候，会有一个判断MOVED的逻辑。它的作用是用来占位，表示原数组中位置i处的节点完成迁移以后，就会在i位置设置一个fwd来告诉其他线程这个位置已经处理过了，具体后续还会在讲
        ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab);
 
        // 首次推进为 true，如果等于 true，说明需要再次推进一个下标（i--），反之，如果是 false，那么就不能推进下标，需要将当前的下标处理完毕才能继续推进
        boolean advance = true;
 
        //判断是否已经扩容完成，完成就return，退出循环
        boolean finishing = false; // to ensure sweep before committing nextTab
 
        //通过for自循环处理每个槽位中的链表元素，默认advace为真，通过CAS设置transferIndex属性值，并初始化i和bound值，i指当前处理的槽位序号，bound指需要处理的槽位边界，先处理槽位15的节点；
        for (int i = 0, bound = 0;;) {
 
            // 这个循环使用CAS不断尝试为当前线程分配任务
 
            // 直到分配成功或任务队列已经被全部分配完毕
 
            // 如果当前线程已经被分配过bucket区域
 
            // 那么会通过--i指向下一个待处理bucket然后退出该循环
            Node<K,V> f; int fh;
            while (advance) {
                int nextIndex, nextBound;
 
                //--i表示下一个待处理的bucket，如果它>=bound,表示当前线程已经分配过bucket区域
                if (--i >= bound || finishing)
                    advance = false;
 
                //表示所有bucket已经被分配完毕 给nextIndex赋予初始值 = 16
                else if ((nextIndex = transferIndex) <= 0) {
                    i = -1;
                    advance = false;
                }
                //通过cas来修改TRANSFERINDEX,为当前线程分配任务，处理的节点区间为(nextBound,nextIndex)->(0,15)
                else if (U.compareAndSwapInt
                         (this, TRANSFERINDEX, nextIndex,
                          nextBound = (nextIndex > stride ?
                                       nextIndex - stride : 0))) {
 
                    //0
                    bound = nextBound;
 
                    //15
                    i = nextIndex - 1;
                    advance = false;
                }
            }
 
            //i<0说明已经遍历完旧的数组，也就是当前线程已经处理完所有负责的bucket
            if (i < 0 || i >= n || i + n >= nextn) {
                int sc;
 
                //如果完成了扩容
                if (finishing) {
 
                    //删除成员变量
                    nextTable = null;
 
                    //更新table数组
                    table = nextTab;
 
                    //更新阈值(32*0.75=24)
                    sizeCtl = (n << 1) - (n >>> 1);
                    return;
                }
 
                // sizeCtl 在迁移前会设置为 (rs << RESIZE_STAMP_SHIFT) + 2 (详细介绍点击这里)
 
                // 然后，每增加一个线程参与迁移就会将 sizeCtl 加 1，
 
                // 这里使用 CAS 操作对 sizeCtl 的低16位进行减 1，代表做完了属于自己的任务
                if (U.compareAndSwapInt(this, SIZECTL, sc = sizeCtl, sc - 1)) {
 
                    //第一个扩容的线程，执行transfer方法之前，会设置 sizeCtl = (resizeStamp(n) << RESIZE_STAMP_SHIFT) + 2)
 
                    //后续帮其扩容的线程，执行transfer方法之前，会设置 sizeCtl = sizeCtl+1
 
                    //每一个退出transfer的方法的线程，退出之前，会设置 sizeCtl = sizeCtl-1
 
                    //那么最后一个线程退出时：必然有
                    //sc == (resizeStamp(n) << RESIZE_STAMP_SHIFT) + 2)，即 (sc - 2) == resizeStamp(n) << RESIZE_STAMP_SHIFT
 
                    // 如果 sc - 2 不等于标识符左移 16 位。如果他们相等了，说明没有线程在帮助他们扩容了。也就是说，扩容结束了。
                    if ((sc - 2) != resizeStamp(n) << RESIZE_STAMP_SHIFT)
                        return;
 
                    // 如果相等，扩容结束了，更新 finising 变量
                    finishing = advance = true;
 
                    // 再次循环检查一下整张表
                    i = n; // recheck before commit
                }
            }
 
            // 如果位置 i 处是空的，没有任何节点，那么放入刚刚初始化的 ForwardingNode ”空节点“
            else if ((f = tabAt(tab, i)) == null)
                advance = casTabAt(tab, i, null, fwd);
 
            //表示该位置已经完成了迁移，也就是如果线程A已经处理过这个节点，那么线程B处理这个节点时，hash值一定为MOVED
            else if ((fh = f.hash) == MOVED)
                advance = true; // already processed
            else {
                synchronized (f) {
                    if (tabAt(tab, i) == f) {
                        Node<K,V> ln, hn;
                        if (fh >= 0) {
                            int runBit = fh & n;
                            Node<K,V> lastRun = f;
                            for (Node<K,V> p = f.next; p != null; p = p.next) {
                                int b = p.hash & n;
                                if (b != runBit) {
                                    runBit = b;
                                    lastRun = p;
                                }
                            }
                            if (runBit == 0) {
                                ln = lastRun;
                                hn = null;
                            }
                            else {
                                hn = lastRun;
                                ln = null;
                            }
                            for (Node<K,V> p = f; p != lastRun; p = p.next) {
                                int ph = p.hash; K pk = p.key; V pv = p.val;
                                if ((ph & n) == 0)
                                    ln = new Node<K,V>(ph, pk, pv, ln);
                                else
                                    hn = new Node<K,V>(ph, pk, pv, hn);
                            }
                            setTabAt(nextTab, i, ln);
                            setTabAt(nextTab, i + n, hn);
                            setTabAt(tab, i, fwd);
                            advance = true;
                        }
                        else if (f instanceof TreeBin) {
                            TreeBin<K,V> t = (TreeBin<K,V>)f;
                            TreeNode<K,V> lo = null, loTail = null;
                            TreeNode<K,V> hi = null, hiTail = null;
                            int lc = 0, hc = 0;
                            for (Node<K,V> e = t.first; e != null; e = e.next) {
                                int h = e.hash;
                                TreeNode<K,V> p = new TreeNode<K,V>
                                    (h, e.key, e.val, null, null);
                                if ((h & n) == 0) {
                                    if ((p.prev = loTail) == null)
                                        lo = p;
                                    else
                                        loTail.next = p;
                                    loTail = p;
                                    ++lc;
                                }
                                else {
                                    if ((p.prev = hiTail) == null)
                                        hi = p;
                                    else
                                        hiTail.next = p;
                                    hiTail = p;
                                    ++hc;
                                }
                            }
                            ln = (lc <= UNTREEIFY_THRESHOLD) ? untreeify(lo) :
                                (hc != 0) ? new TreeBin<K,V>(lo) : t;
                            hn = (hc <= UNTREEIFY_THRESHOLD) ? untreeify(hi) :
                                (lc != 0) ? new TreeBin<K,V>(hi) : t;
                            setTabAt(nextTab, i, ln);
                            setTabAt(nextTab, i + n, hn);
                            setTabAt(tab, i, fwd);
                            advance = true;
                        }
                    }
                }
            }
        }
    }
```
