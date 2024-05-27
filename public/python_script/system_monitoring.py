import os
import psutil
import json
import subprocess
import time
import sys
import requests
import socket
import threading

def get_kernel_info():
    dev_id = 2
    return {
        # "kernel_version": os.uname().release,
        # "system_name": os.uname().sysname,
        # "node_name": os.uname().nodename,
        # "machine": os.uname().machine
        "device_id":dev_id
    }

def get_memory_info():
    return {
        "total_memory": psutil.virtual_memory().total / (1024.0 ** 3),
        "available_memory": psutil.virtual_memory().available / (1024.0 ** 3),
        "used_memory": psutil.virtual_memory().used / (1024.0 ** 3),
        "memory_percentage": psutil.virtual_memory().percent
    }

def get_cpu_info():
    return {
        "physical_cores": psutil.cpu_count(logical=False),
        "total_cores": psutil.cpu_count(logical=True),
        "processor_speed": psutil.cpu_freq().current,
        "cpu_usage_per_core": dict(enumerate(psutil.cpu_percent(percpu=True, interval=1))),
        "total_cpu_usage": psutil.cpu_percent(interval=1)
    }

def get_disk_info():
    partitions = psutil.disk_partitions()
    disk_info = {}
    counter = 0
    for partition in partitions:
        try:
            counter = counter + 1
            partition_usage = psutil.disk_usage(partition.mountpoint)
            custom_key = f"disk{counter}"
            disk_info[custom_key] = {
                "total_space": partition_usage.total / (1024.0 ** 3),
                "used_space": partition_usage.used / (1024.0 ** 3),
                "free_space": partition_usage.free / (1024.0 ** 3),
                "usage_percentage": partition_usage.percent
            }
        except PermissionError:
            # this can be catched due to the disk that
            # isn't ready
            continue
    return disk_info

def get_network_info():
    net_io_counters = psutil.net_io_counters()
    return {
        "bytes_sent": net_io_counters.bytes_sent,
        "bytes_recv": net_io_counters.bytes_recv
    }

# def get_process_info():
#     process_info = []
#     for process in psutil.process_iter(['pid', 'name', 'memory_percent', 'cpu_percent']):
#         try:
#             process_info.append({
#                 "pid": process.info['pid'],
#                 "name": process.info['name'],
#                 "memory_percent": process.info['memory_percent'],
#                 "cpu_percent": process.info['cpu_percent']
#             })
#         except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
#             pass
#     return process_info

def get_load_average():
    load_avg_1, load_avg_5, load_avg_15 = psutil.getloadavg()
    return {
        "load_average_1": load_avg_1,
        "load_average_5": load_avg_5,
        "load_average_15": load_avg_15
    }
    
def get_disk_io_counters():
    io_counters_t1 = psutil.disk_io_counters()
    t = 2
    time.sleep(t)
    io_counters_t2 = psutil.disk_io_counters()
    return {
        "read_count": io_counters_t2.read_count - io_counters_t1.read_count,
        "write_count": io_counters_t2.write_count - io_counters_t1.write_count,
        "read_bytes": io_counters_t2.read_bytes - io_counters_t1.read_bytes,
        "write_bytes": io_counters_t2.write_bytes - io_counters_t1.write_bytes,
        "read_time": io_counters_t2.read_time - io_counters_t1.read_time,
        "write_time": io_counters_t2.write_time - io_counters_t1.write_time,
        "write_speed": ((io_counters_t2.write_bytes - io_counters_t1.write_bytes)/t)/(1024*1024),
        "read_speed": ((io_counters_t2.read_bytes - io_counters_t1.read_bytes)/t)/(1024*1024),
    }
    
def get_net_io_counters():
    io_counters_t1 = psutil.net_io_counters()
    t = 2
    time.sleep(t)
    io_counters_t2 = psutil.net_io_counters()
    return {
        "bytes_sent": io_counters_t2.bytes_sent,
        "bytes_recv": io_counters_t2.bytes_recv,
        "packets_sent": io_counters_t2.packets_sent,
        "packets_recv": io_counters_t2.packets_recv,
        "errin": io_counters_t2.errin,
        "errout": io_counters_t2.errout,
        "dropin": io_counters_t2.dropin,
        "dropout": io_counters_t2.dropout,
        "bytes_sent_speed": (io_counters_t2.bytes_sent - io_counters_t1.bytes_sent)/(t*1024*1024),
        "bytes_recv_speed": (io_counters_t2.bytes_recv - io_counters_t1.bytes_recv)/(t*1024*1024),
    }

def get_system_uptime():
    boot_time_timestamp = psutil.boot_time()
    current_time_timestamp = time.time()
    uptime_seconds = current_time_timestamp - boot_time_timestamp
    uptime_minutes = uptime_seconds // 60
    uptime_hours = uptime_minutes // 60
    uptime_days = uptime_hours // 24
    uptime_str = f"{int(uptime_days)} days, {int(uptime_hours % 24)} hours, {int(uptime_minutes % 60)} minutes, {int(uptime_seconds % 60)} seconds"
    return {"uptime": uptime_str}

def get_net_id():
    hostname = socket.gethostname()
    private_ip_add = socket.gethostbyname(hostname)
    public_ip_add = requests.get('http://api.ipify.org').text
    for interface in psutil.net_if_addrs():
    # Check if the interface has a valid MAC address
        if psutil.net_if_addrs()[interface][0].address:
            # Print the MAC address for the interface
            mac_add = psutil.net_if_addrs()[interface][0].address
            break
    return {
        "private_ip_address" : private_ip_add,
        "public_ip_address" : public_ip_add,
        "mac_address" : mac_add
    }



if __name__ == '__main__':
    data = {
        "kernel_info": get_kernel_info(),
        "memory_info": get_memory_info(),
        "cpu_info": get_cpu_info(),
        "disk_info": get_disk_info(),
        "network_info": get_network_info(),
        # "process_info": get_process_info(),
        "system_uptime": get_system_uptime(),
        # "load_average": get_load_average(),
        "disk_io_counters": get_disk_io_counters(),
        "net_io_counters": get_net_io_counters(),
        "net_id": get_net_id(),
    }

    # data_type = sys.argv[1]
    
    # if data_type == "cpu":
    #     print(json.dumps(data["cpu_info"]))
    # elif data_type == "memory":
    # print(json.dumps(data["kernel_info"]))
    # print("="*40)
    # # print("System Monitoring")
    # # print("="*40)
    # # print(json.dumps(data, indent=4))
    # # print("Memori Info")
    # # print(json.dumps(data_memory, indent=4))
    # # print("CPU Info")
    # # print(json.dumps(data_cpu, indent=4))

    # memoryInfo = json.dumps(data["memory_info"])
    # cpuInfo = json.dumps(data["cpu_info"])

    url = "http://localhost:8000/api/post-device-resources"

   
    response = requests.post(url, json = json.dumps(data))

    # Print the response
    response_json = response.json()
    print(response_json)
    print(json.dumps(data))


    



