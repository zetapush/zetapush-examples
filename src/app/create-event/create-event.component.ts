import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface MyEvent {
	name: string;
	address: string;
	date: string;
}

@Component({
	selector: 'app-create-event',
	templateUrl: './create-event.component.html',
	styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

	eventFormGroup: FormGroup;
	addressFormGroup: FormGroup;
	dateFormGroup: FormGroup;
	hours = Array.from(Array(24), (x, i) => i);

	myEvent: MyEvent = {
		name: null,
		address: null,
		date: null,
	};

	eventID: string;
	eventUrl: string;

	constructor(
		private formBuilder: FormBuilder
	) {}

	format_date() {
		if (!this.dateFormGroup.value.dateCtrl)
			return;
		const date_timestamp = Date.parse(this.dateFormGroup.value.dateCtrl);
		const hour_timestamp = 1000 * 60 * 60 * (this.dateFormGroup.value.hourCtrl || 0);
		const tmp = new Date(date_timestamp + hour_timestamp);
		const d = tmp.getDate();
		const m = tmp.getMonth() + 1; // January is 0!
		const y = tmp.getFullYear();
		const hours_minutes = tmp.toString().split(' ')[4];

		return `${d < 10 ? '0' + d : d}-${m < 10 ? '0' + m : m}-${y} ${hours_minutes}`;
	}

	create_event() {
		this.eventID = '2F!TG52$';
		this.eventUrl = `${window.location.origin}/event/${this.eventID}`;
		console.log(this.myEvent);
	}

	ngOnInit() {
		this.eventFormGroup = this.formBuilder.group({
			eventCtrl: [null, Validators.required]
		});
		this.addressFormGroup = this.formBuilder.group({
			addressCtrl: [null, Validators.required]
		});
		this.dateFormGroup = this.formBuilder.group({
			dateCtrl: [null, Validators.required],
			hourCtrl: [null, Validators.required],
		});
	}
}
