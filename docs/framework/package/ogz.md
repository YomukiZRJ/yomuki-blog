# 如何以组织发包 @xxx/pak-name

[官方文档](https://docs.npmjs.com/organizations)

## 注册组织

## 设置当前包的组织范围

```txt
npm config set scope <org-name>
```

同时包名命名为@org-name/xxxxx

## 发布公共包

```txt
npm publish --access public
```

或者在 package.json 中配置

```json
	"publishConfig": {
		"access": "public"
	}
```
