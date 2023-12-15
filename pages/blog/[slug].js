import Image from 'next/image';
import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it"; // import the markdown-it library
import md from "markdown-it"; // import the markdown-it library
import path from "path";
import styles from '../components/Button.module.css';
import Head from 'next/head'
// The page for each post
export default function Post({frontmatter, content}) {
    const {title, seo, author, category, date, bannerImage, tags, img, info} = frontmatter

    return <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 ">
        
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="pt-10 pb-16">
    <div className="text-sm font-medium text-gray-500">Product</div>
    <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {title}

    </h1>
    <p className="mt-4 max-w-2xl text-xl text-gray-500">
             {seo}

    </p>
  </div>
<address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          
            <Image
  className="mr-4 w-16 h-16 rounded-full"
  src={img}
  alt={author}
  width={64}
  height={64}
/>
            <div>
              <a
                href="#"
                rel="author"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                {author}
              </a>
              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    {info}
              </p>
              <p className="text-base font-light text-gray-500 dark:text-gray-400">
                <time
                  pubdate=""
                  dateTime="{date}"
                  title="{date}"
                >
                  {date}
                </time>
              </p>
            </div>
          </div>
        </address>      
    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
      <header className="mb-4 lg:mb-6 not-format">
        <div>
          <div className="pt-8 pb-16 lg:pt-16 lg:pb-24 ">
            <p>
    <div dangerouslySetInnerHTML={{ __html: content }} />
            </p>
          </div>
        </div>
      </header>
    </article>
  </div>
</div>
<Head>
        <title>{title}-雙龍體育blog</title>
       <meta name="description" content={`{tittle}-雙龍體育blog`} />
      </Head>
</main>

}

// Generating the paths for each post
export async function getStaticPaths() {
  // Get list of all files from our posts directory
  const files = fs.readdirSync("posts");
  // Generate a path for each one
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  // return list of paths
  return {
    paths,
    fallback: false,
  };
}

// Generate the static props for the page
export async function getStaticProps({ params: { slug } }) {
  const fullPath = path.join("posts", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true,
  // Disable header tags
  header: false,
    heading: false,
    plugins: [require('markdown-it-attrs')],


});
md.use(require('markdown-it-attrs'), {
    leftDelimiter: '[',
    rightDelimiter: ']',
  });
  const htmlContent = md.render(content);

  return {
  props: {
    frontmatter,
    content: htmlContent,
    },
  };
}  
