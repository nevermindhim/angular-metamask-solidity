export interface Poll extends PollForm {
  id: number; //1
  results: number[]; //[0,0,0,0,5,7,2]
  voted: boolean;
}
export interface PollForm {
  question: string; //Which days of week you like most?
  options: string[]; //["Moday","Tuesday","Wednesday",...]
  thumbnail: string; // http://image.png
}
export interface PollVote {
  id: number;
  vote: number;
}
export interface Voter {
  id: String; //0xJJGAGHGDWDA
  voted: number[]; //[12]
}
