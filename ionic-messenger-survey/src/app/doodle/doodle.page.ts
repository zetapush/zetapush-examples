import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messaging } from '@zetapush/platform-legacy';

interface DataSet {
  label: string;
  data: number;
}

@Component({
  selector: 'app-doodle',
  templateUrl: './doodle.page.html',
  styleUrls: ['./doodle.page.scss'],
})
export class DoodlePage implements OnInit {
  labels: string[] =  [
    'React',
    'Angular',
    'Vue',
    'Ember',
    'Stencil'
  ];
  data: number[] = [0, 0, 0, 0, 0];
  api: any = null;
  selection: string = null;
  canVote = false;

  constructor(private route: ActivatedRoute) {
    route.parent.data.subscribe(({ connection }) => {
      this.api = connection.createProxyTaskService({
        namespace: 'survey'
      });
      connection.createService({
        Type: Messaging,
        listener: {
          onChangeDataset: ({ data }) => this.onChangeDataset(data.data.survey)
        }
      });
    });
  }

  async ngOnInit() {
    // await this.api.$onApplicationBootstrap();
    this.canVote = await this.api.canVote();
    this.onChangeDataset(await this.api.getSurvey());
  }

  onChangeDataset(dataset: DataSet[]) {
    this.data = dataset.map((choice) => choice.data);
  }

  async onValidate() {
    await this.api.vote(this.selection);
    this.selection = null;
    this.canVote = false;
  }

  getNbVotes() {
    return this.data.reduce((total, nbVotes) => total + nbVotes, 0);
  }
}
