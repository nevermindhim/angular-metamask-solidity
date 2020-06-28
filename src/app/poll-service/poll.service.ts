import { Injectable } from '@angular/core';
import { Poll, PollForm } from '../type';
import { Web3Service } from '../blockchain/web3.service';
import { fromAscii, toAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private web3: Web3Service) {}

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];

    const totalPolls = await this.web3.call('getTotalPolls');
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter', acc);
    const voterNormalized = this.normalizeVoter(voter);

    for (let i = 0; i < totalPolls; i++) {
      const pollRaw = await this.web3.call('getPoll', i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
    }

    return polls;
  }

  vote(pollId: number, voteNumber: number) {
    this.web3.executeTransaction('vote', pollId, voteNumber);
  }

  createPoll(poll: PollForm) {
    this.web3.executeTransaction(
      'createPoll',
      poll.question,
      poll.thumbnail || '',
      poll.options.map((opt) => fromAscii(opt))
    );
  }

  private normalizeVoter(voter) {
    return {
      id: voter[0],
      votedIds: voter[1].map((vote) => parseInt(vote)),
    };
  }

  private normalizePoll(pollRaw, voter): Poll {
    return {
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      thumbnail: pollRaw[2],
      results: pollRaw[3].map((vote) => parseInt(vote)),
      options: pollRaw[4].map((opt) => toAscii(opt).replace(/\u0000/g, '')),
      voted:
        voter.votedIds.length &&
        voter.votedIds.find((votedId) => votedId === parseInt(pollRaw[0])) !=
          undefined,
    };
  }
  onEvent(name: string) {
    return this.web3.onEvents(name);
  }
}
