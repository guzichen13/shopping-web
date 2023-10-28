<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search
      show-action
      placeholder="请输入搜索关键词"
      clearable
      v-model="search">
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div class="list-item"
         v-for="(item, index) in history"
         :key="index"
         @click="goSearch(item)"
         >{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getHistory(),
      search: ''
    }
  },
  methods: {
    goSearch (key) {
      // 是否搜索过 如果搜索过移除再追加到最前面
      const index = this.history.indexOf(key)
      if (index !== -1) { // 存在
        this.history.splice(index, 1) // 删除下标，删除一个
      }
      this.history.unshift(key) // 追加到最前面
      setHistory(this.history) // 设置本地存储
      // 跳转到搜索列表 /searchList
      this.$router.push(`/searchList?search=${key}`)
    },
    clear () {
      this.history = []
      setHistory([]) // 本地存储清空
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
