describe("Rivets.adapters", function() {
  var data, bindData, el, input, list, listItem;

  function listBinding(view) {
    return view.select(function(binding) {
      if(binding.el.tagName === "LI") {
        return binding;
      }
    })[0];
  }

  beforeEach(function() {
    rivets.configure({preloadData: true});

    data = {
      foo: 'bar',
      items: [{name: 'a'}, {name: 'b'}]
    };

    bindData = {data: data};

    el = document.createElement('div');
    input = document.createElement('input');
    input.setAttribute('type', 'text');

    list = document.createElement('ul');
    el.appendChild(list);
    listItem = document.createElement('li');
    listItem.setAttribute('rv-each-item', 'data.items');
    listItem.setAttribute('rv-text', 'item.name');
    list.appendChild(listItem);
  });

  // ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];

  it("should 'push' a new element", function() {
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(2);
    data.items.push({name: 'last'});
    expect(el.getElementsByTagName('li').length).toBe(3);
    expect(list.iterated.length).toBe(3);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('a');
    expect(el.getElementsByTagName('li')[1]).toHaveTheTextContent('b');
    expect(el.getElementsByTagName('li')[2]).toHaveTheTextContent('last');
  });

  it("should 'pop' an element", function() {
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(2);
    data.items.pop();
    expect(el.getElementsByTagName('li').length).toBe(1);
    expect(list.iterated.length).toBe(1);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('a');
  });

  it("should 'shift' an element", function() {
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(2);
    data.items.shift();
    expect(el.getElementsByTagName('li').length).toBe(1);
    expect(list.iterated.length).toBe(1);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('b');
  });

  it("should 'unshift' an element", function() {
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(2);
    data.items.unshift({name: "first"});
    expect(el.getElementsByTagName('li').length).toBe(3);
    expect(list.iterated.length).toBe(3);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('first');
    expect(el.getElementsByTagName('li')[1]).toHaveTheTextContent('a');
    expect(el.getElementsByTagName('li')[2]).toHaveTheTextContent('b');
  });

  it("should 'sort' a collection", function() {
    data.items.push({name: 'd'}, {name: 'c'});
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(4);

    data.items.sort(function(val1, val2) {
      return val1.name < val2.name ? -1 : val1.name > val2.name ? 1 : 0;
    });

    expect(el.getElementsByTagName('li').length).toBe(4);
    expect(list.iterated.length).toBe(4);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('a');
    expect(el.getElementsByTagName('li')[1]).toHaveTheTextContent('b');
    expect(el.getElementsByTagName('li')[2]).toHaveTheTextContent('c');
    expect(el.getElementsByTagName('li')[3]).toHaveTheTextContent('d');
  });

  it("should 'reverse' a collection", function() {
    data.items.push({name: 'c'}, {name: 'd'});
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(4);

    data.items.reverse();

    expect(el.getElementsByTagName('li').length).toBe(4);
    expect(list.iterated.length).toBe(4);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('d');
    expect(el.getElementsByTagName('li')[1]).toHaveTheTextContent('c');
    expect(el.getElementsByTagName('li')[2]).toHaveTheTextContent('b');
    expect(el.getElementsByTagName('li')[3]).toHaveTheTextContent('a');
  });

  it("should 'splice' new elements into the collection", function() {
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(2);

    data.items.splice(1, 0, {name: 'middle'});
    expect(el.getElementsByTagName('li').length).toBe(3);
    expect(list.iterated.length).toBe(3);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('a');
    expect(el.getElementsByTagName('li')[1]).toHaveTheTextContent('middle');
    expect(el.getElementsByTagName('li')[2]).toHaveTheTextContent('b');
  });

  it("should 'splice' elements from the collection", function() {
    var view = rivets.bind(el, bindData);
    var list = listBinding(view);

    expect(el.getElementsByTagName('li').length).toBe(2);

    data.items.splice(1, 1, {name: 'middle'});
    expect(el.getElementsByTagName('li').length).toBe(2);
    expect(list.iterated.length).toBe(2);
    expect(el.getElementsByTagName('li')[0]).toHaveTheTextContent('a');
    expect(el.getElementsByTagName('li')[1]).toHaveTheTextContent('middle');
  });

});