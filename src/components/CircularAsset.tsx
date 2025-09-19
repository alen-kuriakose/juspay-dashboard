
type CircularAssetProps={
    classname:string
}
export const CircularAsset = ({ classname }:CircularAssetProps) => (
    <div className={`absolute ${classname}`} ></div>
  );