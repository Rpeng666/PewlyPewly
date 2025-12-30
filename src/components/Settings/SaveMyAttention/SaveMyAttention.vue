<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import Radio from '~/components/Radio.vue'
import { settings } from '~/logic'

import SettingsItem from '../components/SettingsItem.vue'
import SettingsItemGroup from '../components/SettingsItemGroup.vue'

const { t } = useI18n()
</script>

<template>
  <SettingsItemGroup :title="t('settings.menu_save_my_attention')">
    <SettingsItem :title="t('settings.enable_simple_mode')" :desc="t('settings.enable_simple_mode_desc')">
      <Radio v-model="settings.simpleMode" />
    </SettingsItem>
    <SettingsItem :title="t('settings.hide_comments')" :desc="t('settings.hide_comments_desc')">
      <Radio v-model="settings.simpleModeDisableComments" />
    </SettingsItem>
    <SettingsItem :title="t('settings.only_show_followed_content')" :desc="t('settings.only_show_followed_content_desc')">
      <Radio v-model="settings.simpleModeOnlyFollowed" />
    </SettingsItem>
    <SettingsItem :title="t('settings.hide_video_recommendations')" :desc="t('settings.hide_video_recommendations_desc')">
      <Radio v-model="settings.simpleModeHideVideoRecommendations" />
    </SettingsItem>
    <SettingsItem :title="t('settings.hide_ending_recommendations')" :desc="t('settings.hide_ending_recommendations_desc')">
      <Radio v-model="settings.simpleModeHideEndingRecommendations" />
    </SettingsItem>
  </SettingsItemGroup>
</template>
