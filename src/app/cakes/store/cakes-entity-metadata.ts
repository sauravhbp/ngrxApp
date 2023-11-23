import { EntityMetadataMap } from "@ngrx/data";
import { Cakes } from "./cakes";
export const cakesEntityMetaData:EntityMetadataMap={
    Cake:{selectId:(cake:Cakes)=>cake.id}
}