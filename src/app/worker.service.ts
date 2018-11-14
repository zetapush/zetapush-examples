import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WeakClient, ProxyService } from '@zetapush/client';
import { Messaging } from '@zetapush/platform-legacy/lib/';

export interface MyEvent {
	name: string;
	address: string;
	date: string;
}

@Injectable({
	providedIn: 'root'
})
export class WorkerService {

	client: WeakClient;
	api: ProxyService;
	observer: Subject<any> = new Subject();

	constructor() {
		this.client = new WeakClient({
			platformUrl: 'https://celtia.zetapush.com/zbo/pub/business',
			appName: 'OTNDAKpr'
		});
		this.api = this.client.createProxyTaskService();
	}

	async workerConnect() {
		console.log('start client.connect()');
		await this.client.connect();
		console.log('end client.connect()');
	}

	async createEvent(event: MyEvent): Promise<string> {
		console.log('start api.createEvent()');
		const eventID: string = await this.api.createEvent(event) as string;
		console.log('end api.createEvent()');

		return eventID;
	}

	async joinEvent(eventID: string) {
		console.log('start api.joinEvent()');
		const { event, messages } = await this.api.joinEvent(eventID) as any;
		console.log('end api.joinEvent()');

		await this.client.createService({
			Type: Messaging,
			listener: {
				[eventID]: ({ data }) => this.observer.next(data.data.message)
			}
		});
		return { event, messages };
	}
}
