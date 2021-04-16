<template>
  <div class="go-upload-list">
    <div :class="['go-upload-list-item',file.status]" v-for="(file,i) in files" :key="file.uid" :index="i"> 
      <!--  FIXME:code in here is so chaos, can it become more elegance?  -->
      <div class="go-upload-list-item-img">
        <goicon v-if="file.status === 'pending'" class="go-upload-item-img-loading" name="loading"></goicon>
        <template v-else-if="file.status === 'success'">
          <img v-if="isImage(file.type)" class="go-upload-list-item-img" :src="file.url" alt="">
          <goicon v-else class="go-upload-item-file" name="file"></goicon>
        </template>
        <goicon v-else class="go-upload-item-img-error" name="picture"></goicon>
      </div>
      <div class="go-upload-list-item-name">
        <span>{{ file.name }}</span>
        <my-progress v-if="file.status === 'pending'" :percent="file.percent"></my-progress>
      </div>
      <span class="go-upload-list-item-delete" @click="onDelete(file)">
          <i class="iconfont icon-guanbi"></i>
        </span>
    </div>
  </div>
</template>

<script>
import goicon from '@/components/Upload/com/icon';
import MyProgress from '@/components/Upload/com/progress';
export default {
  name: 'UploadList',
  props: {
    files: {
      type: Array,
      default: true
    }
  },
  components: { MyProgress,goicon },
  data () {
    return {};
  },
  methods: {
    isImage (type) {
      if (!type) {return;}
      return type.includes('image');
      
    },
    onDelete (file) {
      this.$emit('on-delete', file);
    }
  }
};
</script>

<style lang="scss" scoped>
 @import "@/components/Upload/styles/mixins.scss";
 @import "@/components/Upload/styles/vars.scss";
.go-upload-list {
  border: 1px solid #d9d9d9;
  height: 100px;
  margin-top: 10px;
  .go-upload-list-item {
    margin-top: 8px;
    padding: 8px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    border: 1px solid #d9d9d9;
  }
  .go-upload-list-item.failure {
    border: 1px solid $danger;
    color: $danger;
  }
  .go-upload-list-item.success {
    .go-upload-list-item-name {
      color: $primary;
    }
  }
  .go-upload-list-item-name {
    margin-left: 8px;
    flex: 1;
    @include ellipsis;
  }
  .go-upload-list-item-delete {
    cursor: pointer;
    i{
      font-size: 10px;

    }
    
  }
  .go-upload-list-item-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .go-upload-item-img-loading {
    font-size: 20px;
    @include spinner;
  }
  .go-upload-item-error,
  .go-upload-item-file {
    font-size: 28px;
  }
}
</style>