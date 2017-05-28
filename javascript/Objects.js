function Image(Name, description){
	this.Photo = Name;
	this.Description = description;
	this.changePhoto = function(link){
		this.Photo = link;
	}
	this.changeDescription = function(description){
		this.Description = description;
	}
}
function Gallery(){
	this.gallery = [];
	this.size = 0;
	this.addPhoto = function(value, description){
		this.gallery.push(new Image(value, description));
		this.size++;
	}
	this.editPhoto = function(position, value){
		this.gallery[position].changePhoto(value);
	}
	this.editDescription = function(position, value){
		this.gallery[position].changeDescription(value);
	}
	this.deletePhoto = function(position){
		for(var i = position; i < this.size+1; i++){
			var temp = this.gallery[i+1];
			this.gallery[i] = temp;
		}
		this.gallery.pop();
		this.size--;
	}
	this.setMain = function(position){
		var main = this.gallery[position];
		this.deletePhoto(position);
		this.gallery.unshift(main);
		this.size++;
	}
}
var x = new Gallery();
x.addPhoto(1, "hello");
x.addPhoto(2, "hi");
x.addPhoto(3, "yo");
for(var i = 0; i < x.size; i++){
	console.log(x.gallery[i].Photo + ", " + x.gallery[i].Description);
}
x.editDescription(2, "bad");
for(var i = 0; i < x.size; i++){
	console.log(x.gallery[i].Photo + ", " + x.gallery[i].Description);
}
x.editPhoto(2, 5);
for(var i = 0; i < x.size; i++){
	console.log(x.gallery[i].Photo + ", " + x.gallery[i].Description);
}
x.setMain(2);
for(var i = 0; i < x.size; i++){
	console.log(x.gallery[i].Photo + ", " + x.gallery[i].Description);
}