// @flow
type AllCommitDetails = {
  committer_date: string,
  body: string,
  branch: string,
  author_date: string,
  committer_email: string,
  commit: string,
  committer_login: string,
  committer_name: string,
  subject: string,
  commit_url: string,
  author_login: string,
  author_name: string,
  author_email: string
};

type BuildAgent = {
  image: string,
  properties: Properties
};

type BuildParameters = {
  CIRCLE_JOB: string
};

type CircleYml = {
  string: string
};

type Picard = {
  build_agent: BuildAgent,
  resource_class: ResourceClass,
  executor: string
};

type PreviousSuccessfulBuild = {
  build_num: number,
  status: string,
  build_time_millis: number
};

type Properties = {
  executor: string,
  build_agent: string
};

type ResourceClass = {
  cpu: number,
  ram: number,
  class: string
};

export type CircleBuildsResult = {
  compare: string,
  previous_successful_build: PreviousSuccessfulBuild,
  build_parameters: BuildParameters,
  oss: boolean,
  all_commit_details_truncated: boolean,
  committer_date: string,
  body: string,
  usage_queued_at: string,
  context_ids: any[],
  fail_reason: string,
  retry_of: string,
  reponame: string,
  ssh_users: any[],
  build_url: string,
  parallel: number,
  failed: boolean,
  branch: string,
  username: string,
  author_date: string,
  why: string,
  user: User,
  vcs_revision: string,
  workflows: Workflows,
  vcs_tag: string,
  build_num: number,
  infrastructure_fail: boolean,
  committer_email: string,
  has_artifacts: boolean,
  previous: PreviousSuccessfulBuild,
  status: string,
  committer_name: string,
  retries: string,
  subject: string,
  vcs_type: string,
  timedout: boolean,
  dont_build: string,
  lifecycle: string,
  no_dependency_cache: boolean,
  stop_time: string,
  ssh_disabled: boolean,
  build_time_millis: number,
  picard: Picard,
  circle_yml: CircleYml,
  messages: any[],
  is_first_green_build: boolean,
  job_name: string,
  start_time: string,
  canceler: string,
  all_commit_details: AllCommitDetails[],
  platform: string,
  outcome: string,
  vcs_url: string,
  author_name: string,
  node: string,
  queued_at: string,
  canceled: boolean,
  author_email: string
};

type User = {
  is_user: boolean,
  login: string,
  avatar_url: string,
  name: string,
  vcs_type: string,
  id: number
};

type Workflows = {
  job_name: string,
  job_id: string,
  workflow_id: string,
  workspace_id: string,
  upstream_job_ids: any[],
  upstream_concurrency_map: any,
  workflow_name: string
};
