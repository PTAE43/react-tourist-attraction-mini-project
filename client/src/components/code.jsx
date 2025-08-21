
  function toggleKeyword(text, word) {
    const arr = text.split(" ").filter(Boolean);
    return arr.includes(word)
      ? arr.filter((w) => w !== word).join(" ")
      : [...arr, word].join(" ");
  }

  function tagCategory(text, tagSearch) {
    return toggleKeyword(text, tagSearch);
  }

  function handleClickTags(tag) {
    const next = tagCategory(search, tag);
    setSearch(next);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }