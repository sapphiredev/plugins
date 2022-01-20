export interface StatcordOptions {
	key: string;
	autopost?: boolean;
	baseUrl?: string;
	debug?: string;
	sharding?: boolean;
}

export interface PostStats {
	error: boolean;
	message: string | ClientStats;
}

export interface ClientStats {
	error: boolean;
	data: Array<{
		time: number;
		servers: number;
		users: string;
		commands: string;
		active: string[];
		custom1: string;
		custom2: string;
		memactive: number;
		memload: number;
		bandwidth: string;
		cpuload: number;
		count: number;
		votes: number;
	}>;
	popular: Array<{
		name: string;
		count: number;
	}>;
}

export interface BucketStats {
	error: boolean;
	data: {
		totalCommands: number;
		totalVotes: number;
	};
}

export interface UserVotesStats {
	error: boolean;
	didVote: boolean;
	voteCount: number;
	lists: string[];
	data: Array<{
		voteValue: number;
		list: string;
		timestamp: number;
	}>;
}

export enum StatcordEvents {
	POST_STATS = 'postStats',
	POST_COMMAND = 'postCommand',
	POST_STATS_ERROR = 'postStatsError'
}
