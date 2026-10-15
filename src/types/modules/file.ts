export type Files = {
    count?:number;
    list:{
        id:number;
        url:string;//地址
        fileName:string;//文件名 
        format:string;//格式
        subsetId?:number;//所属类型 
    }[];
}
export type FileData = Files['list'][0];