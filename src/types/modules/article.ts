export type Label = {
    id:number;
    name:string;
}

export type Articles = {
    count?:number;
    list:{
        id:number;
        title:string;
        subsetId?:number;
        moment:string; //时间
        label?:string[];
        introduce?:string; //简介 
        cover?:string; //封面地址
        views:number; //查看次数
        state:number; //状态0未发布、1已发布    
        comment:number; //评论数
        like:number; //点赞次数
        content?:string; //内容
    }[];
}
export type ArticleData = Articles['list'][0];
