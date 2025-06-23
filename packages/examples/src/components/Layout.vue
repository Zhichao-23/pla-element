<script setup lang="ts">
import Row from "../../../components/Layout/Row/Row.vue";
import Col from "../../../components/Layout/Col/Col.vue";
</script>

<template>
  <div id="wrapper">
    <Row :style="{ height: '200px', width: '600px'}" :gutter="50" class="bgc-clip">
      <Col :span="8" :style="{backgroundColor: 'red'}" class="bgc-clip">
        <div class="el"></div>
      </Col>
      <Col :span="8" :style="{backgroundColor: '#999'}" class="bgc-clip"></Col>
      <Col :span="7" :style="{backgroundColor: 'blue'}" class="bgc-clip"></Col>
    </Row>
  </div>
</template>

<style>
#wrapper {
  margin: 0 auto;
}
.el {
  background-color: #000066;
  height: 40px;
}
html {
  padding: 30px;
}
.bgc-clip {
  background-clip: content-box;
}
</style>