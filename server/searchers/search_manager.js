
// TODO: implement plugin for youtube to replace test data
var testData = [
  {
    title: '10-10 - FREAK THE MIGHTY',
    url: 'http://r5---sn-aigllnle.googlevideo.com/videoplayback?key=yt5&mt=1434513935&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnh%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&nh=IgpwcjAzLmxocjE0KgkxMjcuMC4wLjE&sver=3&expire=1434535557&upn=2SsG0Le9ZCc&lmt=1386881490945429&mv=m&source=youtube&signature=CC893D7D7FC3018157ABD03C6C3E29DF389A5D31.EF31D0E94DA1A460CDA8BE9FABA46F69ED864D43&ms=au&mime=video%2Fmp4&dur=311.890&pl=32&id=o-AC3ZuvbtyujgLl8R2vUdsVrHBEzovHQI_yIB7PvKbT79&initcwndbps=1133750&ip=2a02%3A2498%3Ae002%3A88%3A44%3A%3A2&itag=18&mn=sn-aigllnle&ipbits=0&mm=31&ratebypass=yes&fexp=9405348%2C9406821%2C9407141%2C9408142%2C9408420%2C9408710%2C9413005%2C9413023%2C9413153%2C9413503%2C9415304%2C9416126&title=10-10+-+FREAK+THE+MIGHTY+-'
  },
  {
    title: 'The Boy Who Lived Before',
    url: 'http://r3---sn-gvnuxaxjvh-n8vs.googlevideo.com/videoplayback?lmt=1429778865599980&mime=video%2Fmp4&key=yt5&itag=18&sver=3&fexp=9406813%2C9407141%2C9407663%2C9407714%2C9408012%2C9408142%2C9408420%2C9408710%2C9412773%2C9413113%2C9413148%2C9413503%2C9414568%2C9415304%2C9415336%2C9415635%2C9416126%2C9416312%2C952640&expire=1434535628&initcwndbps=2037500&ipbits=0&upn=UisqRboQ01I&id=o-AEhYVGkff-0myo7dccSRfjjqw1TdKZk8H2BIhRm8sHTh&dur=2798.143&source=youtube&ratebypass=yes&mt=1434513999&pl=22&mv=m&ms=au&mm=31&ip=217.15.133.110&signature=B1E7F2032ABDE0EAEF8BF9F514A58F71CB0F14ED.362A88E57A870E2C13F68EECBF35118DA9BB1A69&sparams=dur%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Csource%2Cupn%2Cexpire&mn=sn-gvnuxaxjvh-n8vs&title=The+Boy+Who+Lived+Before'
  }
];
var searchManager = {
  init: function(config) {

  },

  search: function(q) {
    console.log(q);
    return new Promise(function(resolve, reject) {
      resolve(testData);
    });
  }
};

module.exports = searchManager;
