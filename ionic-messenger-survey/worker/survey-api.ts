import { Context, Injectable } from '@zetapush/core';
import { GroupExistence, GroupInfo, Groups, Messaging } from '@zetapush/platform-legacy';

interface DataSet {
  label: string;
  data: number;
}

const DATASETS: DataSet[] = [
  { label: 'React', data: 0, },
  { label: 'Angular', data: 0, },
  { label: 'Vue', data: 0, },
  { label: 'Ember', data: 0, },
  { label: 'Stencil', data: 0, }
];

@Injectable()
export class SurveyApi {
  private group: GroupInfo | null = null;
  private requestContext!: Context;
  private survey: DataSet[] = DATASETS;
  constructor(
    private messaging: Messaging,
    private groups: Groups
  ) {}
  async onApplicationBootstrap() {
    console.log('SurveyApi::onApplicationBootstrap');
    const { exists }: GroupExistence = await this.groups.exists({
      group: 'voters'
    });
    if (exists) {
      await this.groups.delGroup({
        group: 'voters'
      });
    }
    await this.groups.createGroup({
      group: 'voters'
    });
    this.group = await this.groups.groupUsers({
      group: 'voters'
    });
    return this.group;
  }
  async vote(label: string) {
    if (await this.canVote()) {
      await this.groups.addUser({
        group: 'voters',
        user: this.requestContext.owner
      });
      const indexOf = this.survey.findIndex((choice) => choice.label === label);
      this.survey = this.survey.map((vote, index) => ({
        ...vote,
        data: vote.data + (index === indexOf ? 1 : 0)
      }));
      this.notify();
    }
    return this.survey;
  }
  async canVote(): Promise<boolean> {
    const { users = [] } = await this.groups.groupUsers({
      group: 'voters'
    });
    return users.indexOf(this.requestContext.owner) === -1;
  }
  getSurvey() {
    return this.survey;
  }
  private async getGroup() {
    if (this.group == null) {
      this.group = await this.groups.groupUsers({
        group: 'messenger'
      });
    }
    return this.group;
  }
  private async notify() {
    const group = await this.getGroup();
    const target = `${Groups.DEFAULT_DEPLOYMENT_ID}:${group.owner}:${group.group}`;
    this.messaging.send({
      channel: 'onChangeDataset',
      target,
      data: {
        survey: this.survey
      }
    }).catch(() => {});
  }
}
