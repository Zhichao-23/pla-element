<script setup lang='ts'>
import Layout from './components/Layout.vue';
import Button from "./components/Button.vue";
import { Message } from "../../components/Message/Message";
import Alert from "./components/Alert.vue";
import Conatiner from "./components/Conatiner.vue";
import Dropdown from './components/Dropdonw.vue';
import Input from './components/Input.vue';
import Notification from './components/Notification.vue';
import { MessageBox } from '@pla-element/components';
import { vLoading } from '../../components/Loading';
import Textarea from './components/Textarea.vue';
import Select from './components/Select.vue';
</script>

<template>
  <Alert v-loading="{
    // fullscreen: true,
    isLoading: true
  }"></Alert>
  <layout></layout>
  <Button>message</Button>
  <button @click="Message({ message: 'abc', type: 'danger', duration: 4000 })">click</button>
  <Conatiner></Conatiner>
  <Dropdown></Dropdown>
  <Input />
  <Notification />
  <button @click="() => MessageBox({
    title: 'MessageBox'
  })">MessageBox</button>
  <Textarea></Textarea>
  <br><br><br>
  <Select></Select>
</template>

<style></style>