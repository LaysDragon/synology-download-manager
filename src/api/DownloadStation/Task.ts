import { SynologyResponse, get } from '../shared';
import {
  DownloadStationTaskActionResponse,
  DownloadStationTaskCreateRequest,
  DownloadStationTaskDeleteRequest,
  DownloadStationTaskGetInfoRequest,
  DownloadStationTaskGetInfoResponse,
  DownloadStationTaskListRequest,
  DownloadStationTaskListResponse
} from './TaskTypes';

const CGI_NAME = 'DownloadStation/task';
const API_NAME = 'SYNO.DownloadStation.Task';

function List(sid: string, options?: DownloadStationTaskListRequest): Promise<SynologyResponse<DownloadStationTaskListResponse>> {
  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'list',
    sid,
    ...options,
    additional: options && options.additional && options.additional.length ? options.additional.join(',') : undefined
  });
}

function GetInfo(sid: string, options: DownloadStationTaskGetInfoRequest): Promise<SynologyResponse<DownloadStationTaskGetInfoResponse>> {
  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'getinfo',
    sid,
    ...options,
    id: options.id.join(','),
    additional: options.additional && options.additional.length ? options.additional.join(',') : undefined
  });
}

function Create(sid: string, options: DownloadStationTaskCreateRequest): Promise<SynologyResponse<{}>> {
  if (options.file) {
    // This requires some nontrivial noodlery with POST and bodies and stuff that I don't yet care about,
    // so leave it for later.
    throw new Error(`Unimplemented behavior: cannot send file data to Task.Create!`);
  }

  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'create',
    sid,
    ...options,
    uri: options.uri && options.uri.length ? options.uri.join(',') : undefined
  });
}

function Delete(sid: string, options: DownloadStationTaskDeleteRequest): Promise<SynologyResponse<DownloadStationTaskActionResponse>> {
  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'delete',
    sid,
    ...options,
    id: options.id.length ? options.id.join(',') : undefined
  });
}

function Pause(sid: string, options: { id: string[]; }): Promise<SynologyResponse<DownloadStationTaskActionResponse>> {
  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'pause',
    sid,
    ...options,
    id: options.id.length ? options.id.join(',') : undefined
  });
}

function Resume(sid: string, options: { id: string[]; }): Promise<SynologyResponse<DownloadStationTaskActionResponse>> {
  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'resume',
    sid,
    ...options,
    id: options.id.length ? options.id.join(',') : undefined
  });
}

function Edit(sid: string, options: { id: string[]; destination?: string; }): Promise<SynologyResponse<DownloadStationTaskActionResponse>> {
  return get(CGI_NAME, {
    api: API_NAME,
    version: 1,
    method: 'edit',
    sid,
    ...options,
    id: options.id.length ? options.id.join(',') : undefined
  });
}

export const Task = {
  List,
  GetInfo,
  Create,
  Delete,
  Pause,
  Resume,
  Edit
};
