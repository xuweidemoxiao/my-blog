import { faker } from "@faker-js/faker";

export const labelMock = {
    code: 200,
    data: {
        list: faker.helpers.multiple(
            (_, index) => {
                return {
                    id: index,
                    name: faker.word.adjective(),
                };
            },
            { count: 10 }
        ),
    }
}

const count = 100;

// markdown 样例内容：单份、覆盖全面，让详情页的 MdPreview 能体现各类富文本渲染效果
const markdownContent = `# 这是一篇示例文章

欢迎阅读，这是一段包含**加粗**、*斜体*、~~删除线~~以及 \`行内代码\` 的示例段落。

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 无序列表

- 无序列表项一
- 无序列表项二
  - 嵌套列表项
- 无序列表项三

## 有序列表

1. 有序列表项一
2. 有序列表项二
3. 有序列表项三

## 任务列表

- [x] 已完成任务
- [ ] 待办任务

## 引用

> 生活不止眼前的苟且，还有诗和远方的田野。
>
> —— 高晓松

## 代码块

\`\`\`ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

interface User {
  id: number;
  name: string;
}
\`\`\`

\`\`\`python
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
\`\`\`

## 表格

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | number | 唯一标识 |
| title | string | 标题 |
| content | string | 内容 |
| moment | string | 时间 |

## 链接与图片

[访问 GitHub](https://github.com)

![示例图片](https://via.placeholder.com/600x200)

## 分割线

---

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\\int_0^1 x^2 dx = \\frac{1}{3}
$$

## 流程图（Mermaid）

\`\`\`mermaid
graph TD
    A[开始] --> B{是否满足条件}
    B -->|是| C[执行操作]
    B -->|否| D[结束]
    C --> D
\`\`\`
`;

export const articleMock = {
    code: 200,
    data: {
        count,
        list: faker.helpers.multiple(
            (_, index) => {
                return {
                    id: index,
                    title: faker.lorem.sentence({ min: 3, max: 5 }),
                    // subsetId：-1 表示未分类，2~9 表示归属某个真实分组（0/1 是「全部」「未分类」特殊 tab id，不作为文章归属值）
                    subsetId: faker.number.int({ min: -1, max: 8 }),
                    moment: faker.date.recent({ days: 30 }).toISOString().replace('T', ' ').slice(0, 19),
                    label: faker.helpers.arrayElements(labelMock.data.list.map((item) => item.name), faker.number.int({ min: 0, max: 5 })),
                    introduce: faker.lorem.sentence({ min: 20, max: 50 }),
                    cover: faker.image.url(),
                    views: faker.number.int({ min: 0, max: 1000 }),
                    state: faker.number.int({ min: 0, max: 1 }),
                    comment: faker.number.int({ min: 0, max: 100 }),
                    like: faker.number.int({ min: 0, max: 100 }),
                    content: markdownContent,
                };
            },
            { count }
        ),
    }
}
