import {CreateSet, CreateTune, MusicSet, Tune, UpdateSet, UpdateTune,} from "@/api-client/api";
import {AxiosPromise} from "axios";

export interface ApiClient {
  assignTunesToSet(
    setId: number,
    requestBody: Array<number>,
    options?: any
  ): AxiosPromise<MusicSet>;

  createSet(createSet: CreateSet, options?: any): AxiosPromise<MusicSet>;

  createTune(createTune: CreateTune, options?: any): AxiosPromise<Tune>;

  deleteSet(setId: number, options?: any): AxiosPromise<void>;

  deleteTune(tuneId: number, options?: any): AxiosPromise<void>;

  getSet(setId: number, options?: any): AxiosPromise<MusicSet>;

  getTune(tuneId: number, options?: any): AxiosPromise<Tune>;

  listSets(options?: any): AxiosPromise<Array<MusicSet>>;

  listTunes(options?: any): AxiosPromise<Array<Tune>>;

  updateSet(
    setId: number,
    updateSet: UpdateSet,
    options?: any
  ): AxiosPromise<void>;

  updateTune(
    tuneId: number,
    updateTune: UpdateTune,
    options?: any
  ): AxiosPromise<void>;
}
