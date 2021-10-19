// const now = new Date()

// function importAll(r) {
//   return r.keys().map(r);
// }

function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const issuesOct2021 = importAll(require.context('../issueImages/', true, /\.(png|jpe?g|svg)$/));

const octEvents = [
  {
    id: 1,
    date: new Date(2021, 8, 12),
    images: [issuesOct2021['oct-2021/issue12Oct.png'], issuesOct2021['oct-2021/issue12Oct2.png']]
  },
  {
    id: 2,
    date: new Date(2021, 8, 13),
    images: [issuesOct2021['nov-2021/issue12Oct.png'], issuesOct2021['nov-2021/issue12Oct2.png']]
  },
]

export default octEvents;
