## http://iamjoel.github.io/2014/02/15/redis-demo1/ 的源码
### 使用redis来完成如下功能
1. 统计某天的上线人数
1. 统计用户一日的流失(下线后，第二天未上线的)

首先要我们要设计一下,我们使用这样的sechema
上线 ：key: `online:{YYYY-MM-DD}`   值（类型用set）：userId
下线 ：key: `offline:{YYYY-MM-DD}`   值（类型用set）：userId

每次用户上线
在上线的数据中加入上线用户的userId。例如，如果‘joel’在2014年1月1日上线，那么执行 
`sadd 'online:2014-01-01' joel`

每次用户下线
在下线的数据中加入上线用户的userId。

统计某天的在线人数
例如 统计2014-01-01的。 执行  
`scard 'online:2014-01-01'`

统计用户一日的流失
例如 统计2014-01-01的。 那么取2013-12-31下线和2014-01-01上线交集的长度。执行 
 `sinter 'offline:2013-12-31' 'online:2014-01-01'` 然后取结果集的长度
