import socket
import requests
import psutil

hostname = socket.gethostname()
myip = socket.gethostbyname(hostname)
print("ip address private : " + myip)

ipAdd = requests.get('http://api.ipify.org').text
for interface in psutil.net_if_addrs():
# Check if the interface has a valid MAC address
    if psutil.net_if_addrs()[interface][0].address:
        # Print the MAC address for the interface
        mac_add = psutil.net_if_addrs()[interface][0].address
        break
print(ipAdd)
print(mac_add)


