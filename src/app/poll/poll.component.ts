import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent implements OnInit {
  @Input() question: string;
  @Input() votes: number[]; //[1,0,5,7]
  @Input() voted: boolean;
  @Input() pollImage: string;
  numberofVotes: number;

  constructor() {}

  ngOnInit(): void {
    if (this.votes.length) {
      this.numberofVotes = this.votes.reduce((acc, curr) => {
        return (acc += curr);
      });
    }
  }
}
