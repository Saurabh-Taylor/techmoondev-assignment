"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { generateSocialMediaPosts } from "./actions";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { LuClipboardCopy } from "react-icons/lu";
import { appendNewData, getSheetData } from "./google-sheets.action";
import moment from "moment-timezone";


export interface InputData{
  TimeStamp:string
  Prompt:string
  Posts:string[]
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<string[]>([]);


  //for future purpose we can build table component to show the data 
  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response)
  };

  const updateDataOnSheet = async()=>{
    const myInputData:InputData = {
      TimeStamp:  moment.tz(new Date(), "Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss'),
      Prompt: input,
      Posts:posts
    }
    await appendNewData(myInputData)
    
  }
  

  //function to generate posts
  const getposts = async () => {
    try {
      setLoading(true);
      const { data } = await generateSocialMediaPosts({
        input,
      });
      setPosts(data.data.map((item: { questions: string }) => item.questions));
      setLoading(false);
    } catch (error) {
      console.error("Error Generating Applications");
      setLoading(false);
    }
  };

  //function to copy posts
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Text Copied to Clipboard!");
      },
      (err) => {
        toast.error("Could not copy text: ", err);
      }
    );
  };

  const SkeletonLoader = () => (
    <div className="space-y-4 mt-4 w-full">
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="w-full h-32 rounded-lg bg-zinc-500" />
      ))}
    </div>
  );

  return (
    <div className="lg:min-h-[80vh] min-h-[50vh] mt-4 flex flex-col justify-center items-center">
      <h1 className="lg:text-6xl text-3xl font-bold text-center tracking-tight">
        Generate{" "}
        <span className="text-orange-700 font-extrabold">
          {" "}
          social media posts text
        </span>{" "}
      </h1>
      {/* form container */}
      <div className="flex items-center justify-center  " >
        <div className="mr-4 " >
        
          <input  value={input} onChange={(e)=> setInput(e.target.value)} className="px-4 py-2 text-black"  placeholder="Ask...." type="text" />
        </div>

        <div
          className={cn(
            "group rounded-lg border mt-4 mb-4 border-black/5 bg-blue-600 text-base text-black transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
          onClick={() => getposts()}
        >
          {loading ? (
            <>
              <Button
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-black hover:duration-300 hover:dark:text-neutral-400"
              >
                <span>✨ Generating</span>
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
              </Button>
            </>
          ) : (
            <Button className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-black hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Generate</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </Button>
          )}
        </div>
      </div>
      <Button onClick={updateDataOnSheet} className=" mr-4 inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-black hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Update Data on spreadsheet</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </Button>
      {loading ? (
        <SkeletonLoader />
      ) : (
        posts.length > 0 && (
          <div className="space-y-4 mt-4 w-full">
            {posts.slice(0, 5).map((post, index) => (
              <div
                key={index}
                className="bg-zinc-200 w-full text-black flex flex-col justify-between items-center px-4 py-4 rounded-xl"
              >
                <div className="row1 w-full flex justify-between items-center">
                  <div className="profile w-full flex gap-2 items-center">
                    <div className="name">
                      <h1 className="leading-tight font-bold text-lg hover:underline">
                        Saurabh Tailor
                      </h1>
                      <h1 className="leading-tight text-zinc-700">@grok</h1>
                    </div>
                  </div>
                  <div
                    onClick={() => copyToClipboard(post)}
                    className="copy flex p-1 rounded-lg items-center gap-1 cursor-pointer transition-all duration-200 hover:text-blue-500"
                  >
                    <LuClipboardCopy size={18} />
                    <span>Copy</span>
                  </div>
                </div>
                <div className="tweet w-full mt-2">
                  <p className="text-left ">{post}</p>
                  {/* <div className="time mt-1">
                    <p className="text-zinc-700 text-sm">
                      <span className="hover:underline">
                        10:04 PM • July 19, 2024{" "}
                      </span>
                      • 270K Views
                    </p>
                  </div> */}
                </div>
               
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
