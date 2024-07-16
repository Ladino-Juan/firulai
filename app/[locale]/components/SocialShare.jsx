"use client";
import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { ShareIcon, XIcon, LinkIcon } from "@heroicons/react/solid";

const SocialShare = ({ url }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const titleToShare = `Check out this amazing post: asdasd`;

  const openModal = () => {
    setModalOpen(true);
    setCopied(false); // Reset copied state when modal is opened
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div>
      <button
        className="p-2 border-2 border-white rounded-md hover:bg-darkestGreen transition-all duration-300"
        onClick={openModal}
      >
        <ShareIcon className="w-5 text-white" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-100 w-full mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3">
            {/* ... (your existing modal content) ... */}
            <div className="flex justify-between items center border-b border-gray-200 py-3">
              <div className="flex items-center justify-center">
                <p className="text-xl font-bold text-gray-800">Share Modal</p>
              </div>
              <div
                className="bg-lightPurple hover:bg-darkPurple cursor-pointer text-white w-8 h-8 p-2 rounded-full"
                onClick={closeModal}
              >
                <XIcon />
              </div>
            </div>

            <div className="my-5 flex justify-center space-x-2">
              <FacebookShareButton
                url={url}
                quote={
                  "next-share is a social share buttons for your next React apps."
                }
                hashtag={"#nextshare"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={url}
                title={
                  "next-share is a social share buttons for your next React apps."
                }
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={url}
                title={
                  "next-share is a social share buttons for your next React apps."
                }
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <p class="text-sm">Or copy link</p>

            <div class="border-2 border-gray-200 flex justify-between items-center mt-4 py-2">
              <LinkIcon className="w-5 mx-2" />

              <input
                className="w-full outline-none bg-transparent"
                type="text"
                placeholder="link"
                value={url}
                readOnly
              />

              <button
                className={`bg-lightPurple text-white rounded text-sm py-2 px-5 mr-2 hover:bg-darkPurple ${
                  copied && "bg-green-500"
                }`}
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
