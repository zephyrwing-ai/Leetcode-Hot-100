(function () {
  var navEl = document.getElementById("nav");
  var contentEl = document.getElementById("doc-content");
  var titleEl = document.getElementById("site-title");

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderMarkdown(md) {
    var lines = md.split("\n");
    var html = [];
    var inCode = false;
    var codeLang = "";
    var listStack = null;

    function closeList() {
      if (listStack === "ul") {
        html.push("</ul>");
      } else if (listStack === "ol") {
        html.push("</ol>");
      }
      listStack = null;
    }

    lines.forEach(function (line) {
      var trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        if (!inCode) {
          inCode = true;
          codeLang = trimmed.slice(3).trim();
          closeList();
          html.push(
            '<pre><code data-lang="' +
              escapeHtml(codeLang) +
              '">'
          );
        } else {
          inCode = false;
          html.push("</code></pre>");
        }
        return;
      }

      if (inCode) {
        html.push(escapeHtml(line));
        return;
      }

      if (!trimmed) {
        closeList();
        html.push("");
        return;
      }

      var headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        closeList();
        var level = headingMatch[1].length;
        html.push(
          "<h" +
            level +
            ">" +
            escapeHtml(headingMatch[2]) +
            "</h" +
            level +
            ">"
        );
        return;
      }

      var orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (orderedMatch) {
        if (listStack !== "ol") {
          closeList();
          listStack = "ol";
          html.push("<ol>");
        }
        html.push("<li>" + escapeHtml(orderedMatch[1]) + "</li>");
        return;
      }

      var unorderedMatch = trimmed.match(/^-+\s+(.*)$/);
      if (unorderedMatch) {
        if (listStack !== "ul") {
          closeList();
          listStack = "ul";
          html.push("<ul>");
        }
        html.push("<li>" + escapeHtml(unorderedMatch[1]) + "</li>");
        return;
      }

      closeList();
      html.push("<p>" + escapeHtml(trimmed) + "</p>");
    });

    closeList();
    return html.join("\n");
  }

  function findLineCommentIndex(line) {
    var inSingle = false;
    var inDouble = false;
    var escaped = false;

    for (var i = 0; i < line.length - 1; i += 1) {
      var ch = line[i];
      var next = line[i + 1];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (ch === "\\\\") {
        escaped = true;
        continue;
      }

      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        continue;
      }

      if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        continue;
      }

      if (!inSingle && !inDouble && ch === "/" && next === "/") {
        return i;
      }
    }

    return -1;
  }

  function extractBlockComment(line, state) {
    var startIndex = line.indexOf("/*");
    if (!state.inBlock && startIndex !== -1) {
      var endIndex = line.indexOf("*/", startIndex + 2);
      if (endIndex !== -1) {
        return {
          text: line.slice(startIndex + 2, endIndex).trim(),
          inBlock: false
        };
      }
      return {
        text: line.slice(startIndex + 2).trim(),
        inBlock: true
      };
    }

    if (state.inBlock) {
      var end = line.indexOf("*/");
      if (end !== -1) {
        return {
          text: line.slice(0, end).trim(),
          inBlock: false
        };
      }
      return {
        text: line.trim(),
        inBlock: true
      };
    }

    return null;
  }

  function annotateCodeBlock(code) {
    if (!code || code.dataset.annotated === "true") {
      return;
    }

    var html = code.innerHTML;
    var lines = html.split("\n");
    var blockState = { inBlock: false };
    var newLines = lines.map(function (lineHtml) {
      var temp = document.createElement("span");
      temp.innerHTML = lineHtml;
      var lineText = temp.textContent || "";

      var lineCommentIndex = findLineCommentIndex(lineText);
      if (lineCommentIndex !== -1) {
        var lineComment = lineText.slice(lineCommentIndex + 2).trim();
        if (lineComment) {
          return (
            '<span class="code-line">' +
            lineHtml +
            buildCommentDetails(lineComment) +
            "</span>"
          );
        }
      }

      var blockComment = extractBlockComment(lineText, blockState);
      if (blockComment && blockComment.text) {
        blockState.inBlock = blockComment.inBlock;
        return (
          '<span class="code-line">' +
          lineHtml +
          buildCommentDetails(blockComment.text) +
          "</span>"
        );
      }

      blockState.inBlock = blockState.inBlock;
      return '<span class="code-line">' + lineHtml + "</span>";
    });

    code.innerHTML = newLines.join("\n");
    code.dataset.annotated = "true";
  }

  function buildCommentDetails(text) {
    return (
      '<details class="code-comment">' +
      "<summary>注释</summary>" +
      '<div class="comment-body">' +
      escapeHtml(text) +
      "</div>" +
      "</details>"
    );
  }

  function annotateAll() {
    var blocks = document.querySelectorAll("pre > code");
    blocks.forEach(annotateCodeBlock);
  }

  function setActiveItem(path) {
    var items = document.querySelectorAll(".nav-item");
    items.forEach(function (item) {
      if (item.dataset.path === path) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function renderNav(config) {
    titleEl.textContent = config.title || "Docs";
    navEl.innerHTML = "";

    config.sections.forEach(function (section) {
      var sectionEl = document.createElement("div");
      sectionEl.className = "nav-section";

      var titleEl = document.createElement("div");
      titleEl.className = "nav-section-title";
      titleEl.textContent = section.title;
      sectionEl.appendChild(titleEl);

      section.items.forEach(function (item) {
        var link = document.createElement("a");
        link.className = "nav-item";
        link.textContent = item.title;
        link.dataset.path = item.path;
        link.addEventListener("click", function () {
          loadDoc(item.path);
        });
        sectionEl.appendChild(link);
      });

      navEl.appendChild(sectionEl);
    });
  }

  function loadDoc(path) {
    if (!path) {
      return;
    }

    fetch(path)
      .then(function (res) {
        if (!res.ok) {
          throw new Error("无法读取文档");
        }
        return res.text();
      })
      .then(function (text) {
        var html = renderMarkdown(text);
        contentEl.innerHTML = html;
        annotateAll();
        setActiveItem(path);
      })
      .catch(function () {
        contentEl.innerHTML =
          '<div class="placeholder">文档加载失败，请检查路径。</div>';
      });
  }

  function init() {
    fetch("docs.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (config) {
        renderNav(config);
        var first =
          config.sections &&
          config.sections[0] &&
          config.sections[0].items &&
          config.sections[0].items[0];
        if (first) {
          loadDoc(first.path);
        }
      })
      .catch(function () {
        contentEl.innerHTML =
          '<div class="placeholder">无法读取 docs.json。</div>';
      });
  }

  init();
})();
