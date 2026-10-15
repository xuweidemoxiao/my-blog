export type Diaries = {
    count?:number;
    list:{
        id:number;
        title:string;
        moment:string;//时间
        weatherId:number;//天气
        content:string;
        pictures?:string[];
    }[]
}
export type DiaryData = Diaries['list'][0];
