from passlib.context import CryptContext


pswdCxt = CryptContext(schemes=["bcrypt"],deprecated="auto")

class Hash():
    def hashPwd(passoword:str):
        return pswdCxt.hash(passoword)
    def verify(plainPassword,hashedPassword):
        return pswdCxt.verify(plainPassword,hashedPassword)
