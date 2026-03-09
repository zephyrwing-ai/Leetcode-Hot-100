# Hash 基础

哈希是什么东西，是数据结构吗

字典为什么叫做哈希结构

`enumerate` 是 python 的一个内置函数，可以用来返回一个包含计数的元组：

```python
seasons = ['Spring', 'Summer', 'Fall', 'Winter']
list(enumerate(seasons))
```

运行上面这两行代码之后结果输出：`[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]`

哈希表进行匹配的时候是通过 key 来匹配的 value，`result[num]=i`，那么 result 里面的内容就是 `{num: i}`
