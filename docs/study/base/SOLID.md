# SOLID 原则

## S：单一职责原则

一个类应该具有一种职责。意味着只存在一种原因使得需要修改类的代码。

## O：开放封闭原则

一个类应该是可扩展的，但是不可修改的。意味着类的行为可以通过扩展来改变，但是不能通过修改类的代码来改变。

不同的登录方式通过扩展这个基础类来实现自己的特殊逻辑：

```ts
enum LoginType {
  WeChat,
  TaoBao,
}
abstract class LoginHander {
  abstract handler(): void;
}
class WeChatLoginHandler implements LoginHander {
  handler() {}
}
class TaoBaoLoginHandler implements LoginHander {
  handler() {}
}
class Login {
  public static handlerMap: Record<LoginType, LoginHander> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler(),
  };

  public static handler(type: LoginType) {
    Login.handlerMap[type].handler();
  }
}
```

## L：里氏替换原则

一个子类可以在程序的任意一处对其父类进行替换。意味着子类可以替换父类，而程序的行为不会受到任何影响。

子类完全继承了父类的一切，对父类进行功能上的拓展（而非收窄）。

## I：接口隔离原则

类的实现方应当只需要实现自己需要的那部分接口。

比如微信登录支持指纹识别，支付宝支持指纹识别和人脸识别，这个时候微信登录的实现类应该不需要实现人脸识别方法才对。这也就意味着我们提供的抽象类应当按照功能维度拆分成粒度更小的组成才对。

## D：依赖倒置原则

这是实现开闭原则的基础。对于高层模块，应当依赖于抽象类或者接口，而不是具体类。对于具体类，应当依赖于抽象类或者接口，而不是高层模块。

还是登录的例子，我们的登录提供方法应该基于共同的登录抽象类实现（LoginHandler），最终调用方法也基于这个抽象类，而不是在一个高阶登录方法中去依赖多个低阶登录提供方。
