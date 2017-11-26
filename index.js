/**
 * @file: autoKeyword
 * @author: Cuttle Cong
 * @date: 2017/11/26
 * @description:
 */

var jieba = require('nodejieba')
var cheerio = require('cheerio')

module.exports = function (meta, gift, opt) {
    opt = opt || {};

    var keyName = opt.name || 'keyword';
    var topN = opt.topN || 20;
    var maxCount = opt.maxCount || 5;


    var getMarkdownData = gift.getMarkdownData

    return getMarkdownData()
        .then(function (data) {
            var html = data.content

            if (meta && !meta[keyName]) {
                var $ = cheerio.load(html)
                meta[keyName] =
                    jieba.extract($('body').text(), parseInt(topN)) || []

                meta[keyName] = meta[keyName]
                    .slice(0, maxCount)
                    .map(function (x) {
                        return x.word;
                    })
                    .filter(Boolean)
            }
        })
};