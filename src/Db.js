/*  Less file  
 *  Author: tomasgerzicak
 *  Name: Db
 *  Version: 1.0
 *  Description:
*/
let fs = require('fs')

class Db {
  constructor() {
    this.fileName = 'src/db.json'
    const rawData = fs.readFileSync(this.fileName)
    this.data = JSON.parse(rawData)
  }

  /**
   *
   * @return {array}
   */
  getWords(){
    return this.data.rude_words
  }
  getCount(){
    if(this.data){
      let count = 0;
      this.data.rude_words.forEach(rudeWord => {
        count += rudeWord.count
      })
      return count
    } else {
      return null
    }
  }
  getPaidPrice () {
    return this.data.paid
  }
  addPoint(word){
    let myWord = this._wordExists(word)
    if(!myWord){
      throw new Error('Word not found')
    }
    myWord.count++
    this.save()
  }
  addWord(word, price){
    if(this._wordExists(word)) throw new Error('Word already exists')
    this.data.rude_words.add({
      name: word,
      price: price,
      count: 0
    })
    this.save()
  }
  save(){
    const dataStringified = JSON.stringify(this.data)
    fs.writeFile(this.fileName, dataStringified, function (err) {
      if(err) console.log(err)
    })
  }

  addPaidAmount(amount){
    this.data.paid += amount
    this.save()
  }

  /**
   * Checks if the word exists in database
   * @param word
   * @return {boolean}
   * @private
   */
  _wordExists(word){
    return this.getWords().find((post, index) => post.name === word)
  }
}

module.exports = Db