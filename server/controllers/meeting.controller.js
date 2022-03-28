/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const dayjs = require("dayjs");
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const parser = new XMLParser();
const fs = require("fs")
var path = require('path');
exports.generateXml = async (req, res) => {
    let fileData = ""
    await fs.readFile("./server/config/wiki_entry.txt","utf-8", function (err, data) {
      if (!err) {
        let rtfData = data
        rtfData = replaceRTFVariables(rtfData,["MEETING_TITLE","MEETING_DATE","STARTING_TIME","DURATION"],req.body)


        //Userlist
        const userDef = findRTFBlock("TEILNEHMER", data)
        let userReplacement = ""
        req.body.TEILNEHMER.forEach(user => {  
          userReplacement+=replaceRTFVariable("TEILNEHMER_NAME", userDef, user)
        })
        rtfData = replaceRTFBlock("TEILNEHMER", rtfData, userReplacement)

        //Topiclist
        const themedef = findRTFBlock("THEMA", data)
        let themeReplacement = ""
        req.body.THEMA.forEach(thema => {
          themeReplacement+=replaceRTFVariable("THEMA_TITLE", themedef, JSON.stringify(thema))
        })
        rtfData = replaceRTFBlock("THEMA", rtfData, themeReplacement)

        //Detailed Themes
        const topicDef = findRTFBlock("DETAIL", data)
        let topicReplacement = ""
        req.body.DETAILS.forEach(thema => {
          let test = replaceRTFVariable("DETAIL_TITLE", topicDef, thema.title)
          test = replaceRTFVariable("DETAIL_TEXT", test, thema.text.replaceAll("\n","\\par " ))
          topicReplacement+=test
        })
        rtfData = replaceRTFBlock("DETAIL", rtfData, topicReplacement)
        
        const filepath = path.join(__dirname, '../meeting_minutes', 'test_meetingMinutes' + dayjs().format("YYYY_MM_DD__HH_mm") + '.txt')
        fs.writeFile(filepath, rtfData, err => {
          if (err) {
            console.error("error in file writing",err)
            return
          } 
          //file written successfully
        })
       
          res.sendFile(filepath, (err,test)=> {
            console.log(err,test, filepath)
          })
       
        
        

      } else {
       res.status(500).send("no config provided");
      }
    })

};
  

function findRTFBlock(blockTag,rtfData) {
  let test1 = rtfData.split("<<" + blockTag + ">>");
  if (test1.length > 1) {
    const test2 = test1[1].split("<</" + blockTag + ">>")
    if (test2.length > 1) {
      return test2[0]
    }
  }
}

function replaceRTFVariable(blockTag,rtfData, replacement) {
  return rtfData.replace(blockTag,replacement)
}
function replaceRTFVariables(rtfData, replacements, requestBody) {
  console.log(requestBody)
  let returndata = rtfData
    replacements.forEach(blockTag => {
      returndata = returndata.replace(blockTag,requestBody[blockTag])
    })
  return returndata
}

function replaceRTFBlock(blockTag, rtfData, replacement) {
  let test1 = rtfData.split("<<" + blockTag + ">>");
  if (test1.length > 1) {
    const test2 = test1[1].split("<</" + blockTag + ">>")
    if (test2.length > 1) {
      return test1[0]+replacement+test2[1]
    }
  }
}
