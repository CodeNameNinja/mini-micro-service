### Create alias.cmd

to get started create an `alias.cmd` in this folder `C:\Program Files\k8s` 

in `alias.cmd` add the following content:

```bash
@echo off
doskey k=kubectl $*

```

then open `regedit` if you are on windows. 

and add a `String` registry file in 
```
[HKEY_CURRENT_USER\Software\Microsoft\Command Processor]
c:\\\"Program Files\"\\k8s\\alias.cmd

```

and save the file as `AutoRun`