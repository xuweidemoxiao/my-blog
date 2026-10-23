export type LineChartData = { date: string; count: number; }[]
export type PieChartData = { key: string; name: string; value: number; }[]

export type Comments = {
    count?:number;
    list:{
        id:number;
        article?:{
            id:number;
            title:string;
        }; //考虑到文章可能被删除/隐藏
        user: {
            id:string | number;
            name:string;
            avatar:string;
        }
        content:string; //内容
        moment:string; //时间
        complaint?:number; //举报数
        like:number; //点赞次数
    }[];
}
export type CommentData = Comments['list'][0];

