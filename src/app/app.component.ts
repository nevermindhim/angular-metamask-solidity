import { Component } from '@angular/core';
import { Poll, PollForm, PollVote } from './type';
import { PollService } from './poll-service/poll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showForm = false;
  activePoll: Poll = null;

  polls = this.ps.getPolls();
  constructor(private ps: PollService) {}

  ngOnInit() {
    this.ps.onEvent('PollCreated').subscribe(() => {
      this.polls = this.ps.getPolls();
    });
  }

  setActivePoll(poll) {
    this.activePoll = null;
    setTimeout(() => {
      this.activePoll = poll;
    }, 100);
  }
  handlePollCreate(poll: PollForm) {
    this.ps.createPoll(poll);
  }
  handlePollVote(pollVoted: PollVote) {
    this.ps.vote(pollVoted.id, pollVoted.vote);
  }
}
