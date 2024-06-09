### RSA 加密 (generate_keypair, encrypt, decrypt)

**函数:**

```python
from salgorithm.crypto import rsa

generate_keypair(p, q)
encrypt(message, public_key)
decrypt(ciphertext, private_key)
```

**参数:**

* **p, q:** 两个大素数，用于生成密钥对
* **message:** 要加密的明文
* **public_key:** 公钥，包含 (e, n)
* **private_key:** 私钥，包含 (d, n)

**返回值:**

* **generate_keypair:** 返回一个包含公钥和私钥的元组
* **encrypt:** 返回加密后的密文
* **decrypt:** 返回解密后的明文

**示例:**

```python
p = 61
q = 53

public_key, private_key = rsa.generate_keypair(p, q)
print(f"公钥: {public_key}")
print(f"私钥: {private_key}")

message = "Hello, world!"
ciphertext = rsa.encrypt(message, public_key)
print(f"密文: {ciphertext}")

decrypted_message = rsa.decrypt(ciphertext, private_key)
print(f"解密后的明文: {decrypted_message}")
```

**注意:** RSA 加密需要使用两个大素数，并且计算过程比较复杂，建议使用库函数进行操作。