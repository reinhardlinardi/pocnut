.PHONY: all css js clean

all: css js
css:
	yarn run sass --no-source-map src/style:public/style
js:
	yarn run tsc

clean:
	./run clean
