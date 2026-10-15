export type Galleries = {
    count?:number;
    list:{
        id:number;
        title:string;
        subsetId?:number;
        moment:string; //时间
        label?:string[];
        introduce?:string; //简介 
        views:number; //查看次数  
        comment:number; //评论数
        praise:number; //点赞次数
        content?:string[]; //内容
    }[];
}
export type GalleryData = Galleries['list'][0];

