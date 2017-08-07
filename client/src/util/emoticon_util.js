const EmoticonUtil = {
  createEmoticon(emoticon){
    return $.ajax({
      method: "POST",
      url: `/api/emoticons?access_token=${localStorage.jwt}`,
      data: emoticon
    });
  }
};

export default EmoticonUtil;
