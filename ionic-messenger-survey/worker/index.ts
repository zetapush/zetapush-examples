import { Module } from '@zetapush/core';

import { MessengerApi } from './messenger-api';
import { ProfileApi } from './profile-api';
import { SurveyApi } from './survey-api';

@Module({
  expose: {
    messenger: MessengerApi,
    profile: ProfileApi,
    survey: SurveyApi
  }
})
export default class WorkerModule {}
