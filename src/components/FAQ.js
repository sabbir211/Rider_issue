import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  return (
    <div className="p-10 text-center flex justify-center flex-col ">
      <div>
        {" "}
        <h2 className=" text-2xl md:text-4xl font-semibold">
          Frequently Asked Question By Rider
        </h2>
      </div>
      <div className="w-full md:w-2/5 mx-auto my-12 text-left" >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What i will do when customer is not reachable?</AccordionTrigger>
            <AccordionContent className="text-gray-500">
             You have to contact rider support for help
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What i will do cancel order?</AccordionTrigger>
            <AccordionContent>
              You have to follow the instruction given by support agent.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What i will do cancel order?</AccordionTrigger>
            <AccordionContent>
              You have to follow the instruction given by support agent.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What i will do cancel order?</AccordionTrigger>
            <AccordionContent>
              You have to follow the instruction given by support agent.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
