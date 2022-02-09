import * as React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const mdToHtml = (md) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify);
  const vfile = processor.processSync(md);
  return vfile.toString();
};

const MdTransformer = ({ markdown }) => {
  const html = mdToHtml(markdown);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export { MdTransformer };
