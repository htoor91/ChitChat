const EmoticonUtil = {
  createEmoticon(emoticon){
    return $.ajax({
      method: "POST",
      url: "/api/emoticons",
      data: emoticon
    });
  }
};

export default EmoticonUtil;
